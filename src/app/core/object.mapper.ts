export interface ObjectMapper<I, O> {
  from(input: I): O;
  to(input: O): I;
}
