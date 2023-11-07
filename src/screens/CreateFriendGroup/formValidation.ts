import { isPast } from "date-fns";

export type NewGroupDTO = {
  title: string;
  partyDate: Date;
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

function validateDate(date: Date): string | undefined {
  if (isPast(date)) return "A data não pode ser no passado.";
  return undefined;
}

function validatePartyTime(time: string): string | undefined {
  if (time.length < 2) return "Descreva melhor o horário da festa.";
  return undefined;
}

function validateGiftPrice(price: string): string | undefined {
  if (price.length === 0) return "Informe o valor médio dos presentes";

  if (isNaN(+price))
    return "O valor dos presentes precisa ser um número válido.";

  if (!Number.isInteger(+price))
    return "O valor dos presentes precisa ser um número inteiro.";

  return undefined;
}

function validatePartyLocation(location: string): string | undefined {
  if (location.length < 3) return "Descreva melhor onde será a revelação.";
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (password.length < 4)
    return "Senha precisa ser maior que quatro caracteres.";
  return undefined;
}

function validate({
  title,
  partyDate,
  partyLocation,
  partyTime,
  giftPrice,
  groupPassword,
}: NewGroupDTO): string | undefined {
  const titleError = validateTitle(title);
  if (titleError) return titleError;

  const dateError = validateDate(partyDate);
  if (dateError) return dateError;

  const timeError = validatePartyTime(partyTime);
  if (timeError) return timeError;

  const locationError = validatePartyLocation(partyLocation);
  if (locationError) return locationError;

  const priceError = validateGiftPrice(giftPrice);
  if (priceError) return priceError;

  const passwordError = validatePassword(groupPassword);
  if (passwordError) return passwordError;

  return undefined;
}

export { validate };
