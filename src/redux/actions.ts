export enum ACTIONS_TYPE {
    CHANGE_CURRENCY_FIELD_TYPE = 'CurrencyExchange/CHANGE_CURRENCY_FIELD_TYPE',
    CHANGE_CHANGE_ACTION = 'CurrencyExchange/CHANGE_CHANGE_ACTION',
    CHANGE_CURRENT_CURRENCY = 'CurrencyExchange/CHANGE_CURRENT_CURRENCY',
}


export type ChangeCurrencyFieldType = {
    type: string
    amountOfBYN: string
    amountOfCurrency: string
};

export const ChangeCurrencyFieldAC = (amountOfBYN: string, amountOfCurrency: string): ChangeCurrencyFieldType => {
    return {
        type: 'CHANGE-CURRENCY-FIELD',
        amountOfBYN,
        amountOfCurrency
    } as const
};

export type ChangeAction = {
    type: string
    isBuying: boolean
};

export const ChangeActionAC = (isBuying: boolean): ChangeAction => {
    return {
        type: 'CHANGE-ACTIONS',
        isBuying: isBuying
    } as const
};

export type ChangeCurrentCurrencyType = {
    type: string
    currentCurrency: string
};

export const СhangeCurrentCurrencyAC = (currentCurrency: string): ChangeCurrentCurrencyType => {
    return {
        type: 'CHANGE-CURRENT-CURRENCY',
        currentCurrency
    } as const
};

export type CurrencyReducersTypes = ChangeCurrencyFieldType | ChangeAction | ChangeCurrentCurrencyType;