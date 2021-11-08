/** Задача 1 - Сущность любой монетки
 * Опишите класс валюты
 * Он должен определять имя(name) валюты, String
 * Содержать количество(value) валюты, Number
 * Содержать количественный тип(unit), в котором исчисляется валюта, String
 * Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит
 * Example new Currency("DOGE", 12.5, "satoshi")
 */

 export class Currency {
    public name: string
    public value: number
    public unit: string
    public type: CurrencyType
  
    constructor(name: keyof typeof CurrencyType, value: number, unit: string) {
        if (!name || value < 0 || !unit || value === undefined) {
            throw new Error('Wrong input!');
        }
        this.name = name;
        this.value = value;
        this.unit = unit;
        this.type = CurrencyType[name];
    }
  }
  
  export enum CurrencyType {
    "Dollar" = "Material",
    "Ruble" = "Material",
    "ru" = "Material",
    "XRP" = "CryptoCurrency",
    "Etherium" = "CryptoCurrency",
    "Gold" = "Metal",
    "alpha" = "CryptoCurrency",
  }
