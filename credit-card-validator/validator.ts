type CardType = 'Visa' | 'Mastercard' | 'Elo' | 'American Express' | 'Discover' | 'Hipercard';

interface CardInfo {
    type: CardType;
    startsWith: (string | [number, number])[];
    length: number[];
}

const cardInfo: CardInfo[] = [
    { type: 'Visa', startsWith: ['4'], length: [16] },
    { type: 'Mastercard', startsWith: [[51, 55], [2221, 2270]], length: [16] },
    { type: 'Elo', startsWith: ['4011', '4312', '4389'], length: [16] },
    { type: 'American Express', startsWith: ['34', '37'], length: [15] },
    { type: 'Discover', startsWith: ['6011', '65', [644, 649]], length: [16] },
    { type: 'Hipercard', startsWith: ['6062'], length: [16] },
];

function validateCard(cardNumber: string): string | null {
    // Remover espaços em branco
    const sanitizedCardNumber = cardNumber.replace(/\s+/g, '');

    for (const card of cardInfo) {
        for (const prefix of card.startsWith) {
            if (typeof prefix === 'string' && sanitizedCardNumber.startsWith(prefix)) {
                if (card.length.includes(sanitizedCardNumber.length)) {
                    return card.type;
                }
            } else if (Array.isArray(prefix)) {
                const [start, end] = prefix;
                const prefixNumber = parseInt(sanitizedCardNumber.slice(0, start.toString().length), 10);
                if (prefixNumber >= start && prefixNumber <= end) {
                    if (card.length.includes(sanitizedCardNumber.length)) {
                        return card.type;
                    }
                }
            }
        }
    }
    return null;
}

// Tornando a função disponível no escopo global para ser chamada no HTML
(window as any).validateCard = validateCard;
