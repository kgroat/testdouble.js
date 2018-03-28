
export interface Constructor0<T> {
  new (): T & Object
}

export interface Constructor1<A1, T> {
  new (a1: A1): T & Object
}

export interface Constructor2<A1, A2, T> {
  new (a1: A1, a2: A2): T & Object
}

export interface Constructor3<A1, A2, A3, T> {
  new (a1: A1, a2: A2, a3: A3): T & Object
}

export interface Constructor4<A1, A2, A3, A4, T> {
  new (a1: A1, a2: A2, a3: A3, a4: A4): T & Object
}
