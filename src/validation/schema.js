export function createSchema(definition) {
    return {
        definition,
        validate(value) {
            const errors = [];

            for (const [fieldName, rules] of Object.entries(definition)) {
                const fieldValue = value?.[fieldName];

                if (rules.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
                    errors.push(`${fieldName} is required.`);
                    continue;
                }

                if (rules.type && fieldValue !== undefined && fieldValue !== null && typeof fieldValue !== rules.type) {
                    errors.push(`${fieldName} must be of type ${rules.type}.`);
                }

                if (Array.isArray(rules.allowedValues) && fieldValue !== undefined && !rules.allowedValues.includes(fieldValue)) {
                    errors.push(`${fieldName} must be one of: ${rules.allowedValues.join(', ')}.`);
                }
            }

            return {
                valid: errors.length === 0,
                errors
            };
        }
    };
}

export function validateContent(content, schema) {
    return schema.validate(content);
}
