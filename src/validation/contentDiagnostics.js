export function formatValidationError(entry, result) {
    return {
        file: entry?.file ?? 'unknown',
        property: entry?.property ?? 'unknown',
        expected: entry?.expected ?? 'valid schema',
        actual: entry?.actual ?? 'invalid payload',
        suggestedFix: entry?.suggestedFix ?? 'Review the content definition and align it with the schema.'
    };
}

export function reportValidationIssues(fileName, validationResult) {
    if (!validationResult || validationResult.valid) {
        return [];
    }

    return validationResult.errors.map((error) => ({
        file: fileName,
        property: 'content',
        expected: 'schema-compliant content',
        actual: error,
        suggestedFix: 'Fix the malformed field or remove the invalid entry before registration.'
    }));
}
