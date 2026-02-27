import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationStatus } from '@prisma/client';
import { ForwardReservationStatus } from './dto/update-reservation-status.dto';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';

const PROPERTY_ID = 'prop-1';
const RESERVATION_ID = 'res-1';

const baseReservation = {
  id_reservation: RESERVATION_ID,
  id_property: PROPERTY_ID,
  guestName: 'Alice',
  numberOfGuests: 2,
  startDate: new Date('2026-03-10'),
  endDate: new Date('2026-03-15'),
  totalCost: 500,
  platform: 'AIRBNB',
  status: ReservationStatus.UPCOMING,
  dateCancelled: null,
};

let mockRepo: jest.Mocked<ReservationRepository>;

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    mockRepo = {
      propertyExists: jest.fn(),
      checkOverlap: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      existsById: jest.fn(),
      update: jest.fn(),
      updateStatus: jest.fn(),
      cancel: jest.fn(),
    } as unknown as jest.Mocked<ReservationRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        { provide: ReservationRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  // ---------------------------------------------------------------------------
  // create
  // ---------------------------------------------------------------------------
  describe('create', () => {
    const dto = {
      guestName: 'Alice',
      numberOfGuests: 2,
      startDate: '2026-03-10',
      endDate: '2026-03-15',
      totalCost: 500,
      platform: 'AIRBNB' as any,
    };

    it('should throw NotFoundException when the property does not exist', async () => {
      mockRepo.propertyExists.mockResolvedValue(false);

      await expect(service.create(PROPERTY_ID, dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when endDate equals startDate', async () => {
      mockRepo.propertyExists.mockResolvedValue(true);

      await expect(
        service.create(PROPERTY_ID, { ...dto, startDate: '2026-03-10', endDate: '2026-03-10' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when endDate is before startDate', async () => {
      mockRepo.propertyExists.mockResolvedValue(true);

      await expect(
        service.create(PROPERTY_ID, { ...dto, startDate: '2026-03-15', endDate: '2026-03-10' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException when dates overlap an existing reservation', async () => {
      mockRepo.propertyExists.mockResolvedValue(true);
      mockRepo.checkOverlap.mockResolvedValue(true);

      await expect(service.create(PROPERTY_ID, dto)).rejects.toThrow(ConflictException);
    });

    it('should NOT throw when a new reservation starts exactly when an existing one ends (back-to-back)', async () => {
      mockRepo.propertyExists.mockResolvedValue(true);
      // The repo's checkOverlap uses startDate < endDate (exclusive), so back-to-back
      // reservations do not overlap – simulate that here.
      mockRepo.checkOverlap.mockResolvedValue(false);
      mockRepo.create.mockResolvedValue({ ...baseReservation, startDate: new Date('2026-03-15'), endDate: new Date('2026-03-20') });

      // endDate of existing == startDate of new → should succeed
      await expect(
        service.create(PROPERTY_ID, { ...dto, startDate: '2026-03-15', endDate: '2026-03-20' }),
      ).resolves.not.toThrow();
    });

    it('should create and return the reservation on success', async () => {
      mockRepo.propertyExists.mockResolvedValue(true);
      mockRepo.checkOverlap.mockResolvedValue(false);
      mockRepo.create.mockResolvedValue(baseReservation);

      const result = await service.create(PROPERTY_ID, dto);

      expect(result).toEqual(baseReservation);
      expect(mockRepo.create).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // findOne
  // ---------------------------------------------------------------------------
  describe('findOne', () => {
    it('should throw NotFoundException when the reservation does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.findOne(RESERVATION_ID)).rejects.toThrow(NotFoundException);
    });

    it('should return the reservation when it exists', async () => {
      mockRepo.findById.mockResolvedValue(baseReservation);

      const result = await service.findOne(RESERVATION_ID);

      expect(result).toEqual(baseReservation);
    });
  });

  // ---------------------------------------------------------------------------
  // update
  // ---------------------------------------------------------------------------
  describe('update', () => {
    it('should throw NotFoundException when the reservation does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.update(RESERVATION_ID, { guestName: 'Bob' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when the reservation is CANCELLED', async () => {
      mockRepo.findById.mockResolvedValue({
        ...baseReservation,
        status: ReservationStatus.CANCELLED,
      });

      await expect(service.update(RESERVATION_ID, { guestName: 'Bob' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when the reservation is COMPLETED', async () => {
      mockRepo.findById.mockResolvedValue({
        ...baseReservation,
        status: ReservationStatus.COMPLETED,
      });

      await expect(service.update(RESERVATION_ID, { guestName: 'Bob' })).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when updated endDate equals updated startDate', async () => {
      mockRepo.findById.mockResolvedValue(baseReservation);

      await expect(
        service.update(RESERVATION_ID, { startDate: '2026-04-01', endDate: '2026-04-01' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when updated endDate is before updated startDate', async () => {
      mockRepo.findById.mockResolvedValue(baseReservation);

      await expect(
        service.update(RESERVATION_ID, { startDate: '2026-04-05', endDate: '2026-04-01' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException when new dates overlap another reservation', async () => {
      mockRepo.findById.mockResolvedValue(baseReservation);
      mockRepo.checkOverlap.mockResolvedValue(true);

      await expect(
        service.update(RESERVATION_ID, { startDate: '2026-04-01', endDate: '2026-04-10' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should NOT throw when updated dates are back-to-back with another reservation', async () => {
      mockRepo.findById.mockResolvedValue(baseReservation);
      mockRepo.checkOverlap.mockResolvedValue(false);
      const updated = { ...baseReservation, startDate: new Date('2026-03-15'), endDate: new Date('2026-03-20') };
      mockRepo.update.mockResolvedValue(updated);

      await expect(
        service.update(RESERVATION_ID, { startDate: '2026-03-15', endDate: '2026-03-20' }),
      ).resolves.not.toThrow();
    });

    it('should update and return the reservation on success', async () => {
      const updated = { ...baseReservation, guestName: 'Bob' };
      mockRepo.findById.mockResolvedValue(baseReservation);
      mockRepo.update.mockResolvedValue(updated);

      const result = await service.update(RESERVATION_ID, { guestName: 'Bob' });

      expect(result).toEqual(updated);
      expect(mockRepo.update).toHaveBeenCalledTimes(1);
    });
  });

  // ---------------------------------------------------------------------------
  // updateStatus
  // ---------------------------------------------------------------------------
  describe('updateStatus', () => {
    it('should throw NotFoundException when the reservation does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(
        service.updateStatus(RESERVATION_ID, ForwardReservationStatus.ACTIVE),
      ).rejects.toThrow(NotFoundException);
    });

    it('should allow UPCOMING → ACTIVE transition', async () => {
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.UPCOMING });
      mockRepo.updateStatus.mockResolvedValue({ ...baseReservation, status: ReservationStatus.ACTIVE });

      const result = await service.updateStatus(RESERVATION_ID, ForwardReservationStatus.ACTIVE);

      expect(result.status).toBe(ReservationStatus.ACTIVE);
    });

    it('should allow ACTIVE → COMPLETED transition', async () => {
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.ACTIVE });
      mockRepo.updateStatus.mockResolvedValue({ ...baseReservation, status: ReservationStatus.COMPLETED });

      const result = await service.updateStatus(RESERVATION_ID, ForwardReservationStatus.COMPLETED);

      expect(result.status).toBe(ReservationStatus.COMPLETED);
    });

    it('should throw BadRequestException for UPCOMING → COMPLETED (skipping ACTIVE)', async () => {
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.UPCOMING });

      await expect(
        service.updateStatus(RESERVATION_ID, ForwardReservationStatus.COMPLETED),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for ACTIVE → ACTIVE (no-op forward)', async () => {
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.ACTIVE });

      await expect(
        service.updateStatus(RESERVATION_ID, ForwardReservationStatus.ACTIVE),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when transitioning from COMPLETED', async () => {
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.COMPLETED });

      await expect(
        service.updateStatus(RESERVATION_ID, ForwardReservationStatus.ACTIVE),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when transitioning from CANCELLED', async () => {
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.CANCELLED });

      await expect(
        service.updateStatus(RESERVATION_ID, ForwardReservationStatus.ACTIVE),
      ).rejects.toThrow(BadRequestException);
    });
  });

  // ---------------------------------------------------------------------------
  // cancel
  // ---------------------------------------------------------------------------
  describe('cancel', () => {
    it('should throw NotFoundException when the reservation does not exist', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.cancel(RESERVATION_ID)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException when the reservation is already CANCELLED', async () => {
      mockRepo.findById.mockResolvedValue({
        ...baseReservation,
        status: ReservationStatus.CANCELLED,
      });

      await expect(service.cancel(RESERVATION_ID)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when the reservation is COMPLETED', async () => {
      mockRepo.findById.mockResolvedValue({
        ...baseReservation,
        status: ReservationStatus.COMPLETED,
      });

      await expect(service.cancel(RESERVATION_ID)).rejects.toThrow(BadRequestException);
    });

    it('should cancel an UPCOMING reservation', async () => {
      const cancelled = {
        ...baseReservation,
        status: ReservationStatus.CANCELLED,
        dateCancelled: new Date(),
      };
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.UPCOMING });
      mockRepo.cancel.mockResolvedValue(cancelled);

      const result = await service.cancel(RESERVATION_ID);

      expect(result.status).toBe(ReservationStatus.CANCELLED);
      expect(mockRepo.cancel).toHaveBeenCalledWith(RESERVATION_ID);
    });

    it('should cancel an ACTIVE reservation', async () => {
      const cancelled = {
        ...baseReservation,
        status: ReservationStatus.CANCELLED,
        dateCancelled: new Date(),
      };
      mockRepo.findById.mockResolvedValue({ ...baseReservation, status: ReservationStatus.ACTIVE });
      mockRepo.cancel.mockResolvedValue(cancelled);

      const result = await service.cancel(RESERVATION_ID);

      expect(result.status).toBe(ReservationStatus.CANCELLED);
    });
  });
});
