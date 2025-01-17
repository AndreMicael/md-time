export enum CategoryId {
    DESTAQUES = 10,
    DICAS = 8,
    NOVIDADES = 17,
    PROMOCOES = 9,
    REVIEW = 7,
    VIDEO = 12
}

export const CategoryNames = {
    [CategoryId.DESTAQUES]: 'Destaques',
    [CategoryId.DICAS]: 'Dicas',
    [CategoryId.NOVIDADES]: 'Novidades',
    [CategoryId.PROMOCOES]: 'Promoções',
    [CategoryId.REVIEW]: 'Review',
    [CategoryId.VIDEO]: 'Vídeos'
} as const; 