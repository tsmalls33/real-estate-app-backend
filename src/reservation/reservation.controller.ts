import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRoles } from '@RealEstate/types';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import type { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { CostService } from '../cost/cost.service';
import { CreateReservationCostDto } from '../cost/dto/create-reservation-cost.dto';
import { UpdateCostDto } from '../cost/dto/update-cost.dto';
import { GetCostsQueryParams } from '../cost/dto/get-costs-query-params';
import { ReservationService } from './reservation.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UpdateReservationStatusDto } from './dto/update-reservation-status.dto';

@ApiTags('Reservation')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRoles.SUPERADMIN)
@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly costService: CostService,
  ) {}

  /** GET /reservations/:id_reservation */
  @Get(':id_reservation')
  @ResponseMessage('Reservation fetched successfully')
  findOne(
    @Param('id_reservation') id_reservation: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reservationService.findOne(id_reservation, user);
  }

  /** PATCH /reservations/:id_reservation */
  @Patch(':id_reservation')
  @ResponseMessage('Reservation updated successfully')
  update(
    @Param('id_reservation') id_reservation: string,
    @Body() dto: UpdateReservationDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reservationService.update(id_reservation, dto, user);
  }

  /** PATCH /reservations/:id_reservation/status */
  @Patch(':id_reservation/status')
  @ResponseMessage('Reservation status updated successfully')
  updateStatus(
    @Param('id_reservation') id_reservation: string,
    @Body() dto: UpdateReservationStatusDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reservationService.updateStatus(id_reservation, dto.status, user);
  }

  /** PATCH /reservations/:id_reservation/cancel */
  @Patch(':id_reservation/cancel')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Reservation cancelled successfully')
  cancel(
    @Param('id_reservation') id_reservation: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.reservationService.cancel(id_reservation, user);
  }

  /** GET /reservations/:id_reservation/costs */
  @Get(':id_reservation/costs')
  findCosts(
    @Param('id_reservation') id_reservation: string,
    @Query(new ValidationPipe({ transform: true })) query: GetCostsQueryParams,
    @CurrentUser() user: JwtPayload,
  ) {
    // Verify reservation tenant before listing costs
    return this.reservationService.findOne(id_reservation, user).then(() =>
      this.costService.findAll({ ...query, id_reservation }),
    );
  }

  /** POST /reservations/:id_reservation/costs */
  @Post(':id_reservation/costs')
  createCost(
    @Param('id_reservation') id_reservation: string,
    @Body() dto: CreateReservationCostDto,
    @CurrentUser() user: JwtPayload,
  ) {
    // Verify reservation tenant before creating cost
    return this.reservationService.findOne(id_reservation, user).then(() =>
      this.costService.create({ ...dto, id_reservation }),
    );
  }

  /** PATCH /reservations/:id_reservation/costs/:id_cost */
  @Patch(':id_reservation/costs/:id_cost')
  updateCost(
    @Param('id_reservation') id_reservation: string,
    @Param('id_cost') id_cost: string,
    @Body() dto: UpdateCostDto,
    @CurrentUser() user: JwtPayload,
  ) {
    // Verify reservation tenant before updating cost
    return this.reservationService.findOne(id_reservation, user).then(() =>
      this.costService.update(id_cost, dto),
    );
  }

  /** DELETE /reservations/:id_reservation/costs/:id_cost */
  @Delete(':id_reservation/costs/:id_cost')
  deleteCost(
    @Param('id_reservation') id_reservation: string,
    @Param('id_cost') id_cost: string,
    @CurrentUser() user: JwtPayload,
  ) {
    // Verify reservation tenant before deleting cost
    return this.reservationService.findOne(id_reservation, user).then(() =>
      this.costService.remove(id_cost),
    );
  }
}
