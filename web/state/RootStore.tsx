import { makeAutoObservable } from 'mobx'

export class RootStore {
  user: User
  sampleStringList = ['one', 'two', 'three']

  constructor() {
    makeAutoObservable(this)
  }

  get sampleStringsCount(): number {
    return this.sampleStringList.length
  }

  public addNewString(newString: string): void {
    this.sampleStringList.push(newString)
  }
}

export class User {
  acceptedTerms = false
  isAdult = false
}
