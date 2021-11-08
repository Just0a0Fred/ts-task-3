/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites {
	public id: number;
	public store: Set<Currency> = new Set<Currency>();

	public withdraw(currency: Currency) {
		let withdrawCurrency = false;
		this.store.forEach((value) => {
			if (value.name === currency.name) {
				if (value.value >= currency.value) {
					withdrawCurrency = true;				
					value.value -= currency.value;
				}
				else {
					throw new Error('Insufficient funds');
				}
			}
		});
		if (!withdrawCurrency) {
			throw new Error('Something went wrong!');
		}
	}

	public deposit(currency: Currency) {
		let newCurrency = false;
		this.store.forEach((value) => {
			if (value.name === currency.name) {
			value.value += currency.value;
			newCurrency = true;
			}
		});
		if (!newCurrency) {
			this.store.add(currency);
		}
	}

	public transfer(currency: Currency, vault: Vault) {
		this.withdraw(currency);
		vault.deposit(currency);
	}
}

export interface ISecureVaultRequisites {
	id: number;
}
