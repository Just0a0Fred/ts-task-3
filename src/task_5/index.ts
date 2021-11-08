/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
 import { IContract } from "../task_4";
 import { ISecureVaultRequisites,Vault } from "../task_3";
 
 
 export class BankController{
 
     private static controller: BankController;
     private vaultStore: Vault[] = [];
 
     public static getController(): BankController {
         if (!BankController.controller) {
             BankController.controller = new BankController();
         }
 
         return BankController.controller;
     }
 
     public registerVault(vault :Vault ): ISecureVaultRequisites{
         this.vaultStore.push(vault);
 
         return vault;
     }
 
     public proceedContract(contract: IContract) {
         const sender = this.vaultStore.find((el) => el.id === contract.sender.id);
         const receiver = this.vaultStore.find((el) => el.id === contract.receiver.id);
         if ((sender && receiver) !== undefined) {
             contract.signAndTransfer()
             if (contract.value.type == "Material") {
                 try {
                     sender.transfer(contract.value, receiver)
                     contract.closeTransfer();
                 } catch (e) {
                     contract.rejectTransfer();
                 }
             } else if (contract.value.type == "CryptoCurrency") {
                 try {
                     setTimeout(() => {
                         sender.transfer(contract.value, receiver)
                         contract.closeTransfer();
                     }, 3000)
                 } catch (e) {
                     contract.rejectTransfer();
                 }
             } else if (contract.value.type == "Metal") {
                 try {
                     setTimeout(() => {
                         sender.transfer(contract.value, receiver)
                         contract.closeTransfer();
                     }, 6000)
                 } catch (e) {
                     contract.rejectTransfer();
                 }
             } else {
                 contract.rejectTransfer();
             }
         }
     }
 }

