/**
 * 숫자 혹은 문자열 형태의 값을 px 단위로 변환하는 함수
 * @param value px로 변환할 값
 * @returns px 단위로 변환된 문자열
 */
export const calculatePixel = (value: number | string) => {
  if (typeof value === "number") {
    return `${value * 8}px`;
  }
  return value;
};
