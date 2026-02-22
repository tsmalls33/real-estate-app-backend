"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedThemes = seedThemes;
const DEFAULT_THEMES = [
    {
        id_theme: 'theme-default-000001',
        name: 'Default',
        primary: '#1976d2',
        secondary: '#9c27b0',
        accent: '#ff9800',
    },
    {
        id_theme: 'theme-dark-000001',
        name: 'Dark',
        primary: '#121212',
        secondary: '#1e1e1e',
        accent: '#bb86fc',
    },
];
async function seedThemes(prisma) {
    console.log('Seeding themes...');
    for (const theme of DEFAULT_THEMES) {
        await prisma.theme.upsert({
            where: { id_theme: theme.id_theme },
            update: {
                name: theme.name,
                primary: theme.primary,
                secondary: theme.secondary,
                accent: theme.accent,
            },
            create: theme,
        });
    }
    console.log('Themes seeded successfully');
}
//# sourceMappingURL=theme.seed.js.map