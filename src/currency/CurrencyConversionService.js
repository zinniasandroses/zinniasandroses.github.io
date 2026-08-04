export class CurrencyConversionService {
    constructor({ conversions = [] } = {}) {
        this.conversions = new Map(conversions.map((entry) => [entry.id, entry]));
    }

    getConversionRule(id) {
        return this.conversions.get(id) ?? null;
    }

    convert(amount, fromCurrencyId, toCurrencyId) {
        const from = this.getConversionRule(fromCurrencyId);
        const to = this.getConversionRule(toCurrencyId);

        if (!from || !to) {
            return null;
        }

        const normalized = amount / from.conversionRate;
        return normalized * to.conversionRate;
    }
}

export function createCurrencyConversionService(options = {}) {
    return new CurrencyConversionService(options);
}
