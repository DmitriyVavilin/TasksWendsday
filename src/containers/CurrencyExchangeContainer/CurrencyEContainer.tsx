import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState, CurrencyType} from '../../redux/currencyReducer';
import {ChangeActionAC, ChangeCurrencyFieldAC, ChangeCurrentCurrencyAC} from '../../redux/actions';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from "../../redux/state";


export const CurrencyEContainer: React.FC = () => {

    const  setCurrencyAmount = (amountOfBYN: string, amountOfCurrency: string) => {
        dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
    }
    const setAction = (isBuying: boolean) => {
        dispatch(ChangeActionAC(isBuying));
    }
    const changeCurrency = (currency: string) => {
        dispatch(ChangeCurrentCurrencyAC(currency));
    }

    const currency = useSelector<IGlobalState, CurrencyState>(state => state.currency)
    const dispatch = useDispatch()

    let currentCurrency = currency.currentCurrency
    let currencyisBuying = currency.currentCurrency

    let currencyRate: number = 0;
    const currenciesName = currency.currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = currencyisBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                }
            } else {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                }
            }
        }
    };

    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currency.currentCurrency}
                currencyRate={currencyRate}
                isBuying={currency.isBuying}
                amountOfBYN={currency.amountOfBYN}
                amountOfCurrency={currency.amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};



