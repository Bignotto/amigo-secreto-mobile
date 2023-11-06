export type NewGroupDTO = {
  title: string;
  partyTime: string;
  partyLocation: string;
  giftPrice: string;
  groupPassword: string;
};

function validateTitle(title: string): string | undefined {
  if (title.length < 3)
    return "Nome do grupo precisa ser maior que três caracteres.";

  if (title.length > 30)
    return "Nome do grupo precisa ser menor que trinta caracteres.";

  return undefined;
}

//NEXT: finish validation
function validate({
  title,
  partyLocation,
  partyTime,
  giftPrice,
  groupPassword,
}: NewGroupDTO): string | undefined {
  const titleError = validateTitle(title);
  if (titleError) return titleError;

  return undefined;
}

export { validate };
