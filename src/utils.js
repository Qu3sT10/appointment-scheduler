export const getTimeFromDate = (input) => {
  if (!input) return;

  const minutes =
    new Date(input).getMinutes() > 10
      ? new Date(input).getMinutes()
      : `0${new Date(input).getMinutes()}`;

  const hours =
    new Date(input).getHours() > 10
      ? new Date(input).getHours()
      : `0${new Date(input).getHours()}`;

  return `${hours}:${minutes}`;
};
