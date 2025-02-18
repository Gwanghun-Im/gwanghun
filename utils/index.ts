"use client"

/**
 * 세금 관련 상수
 * @constant
 */
const TAX_CONSTANTS = {
  SIMPLE_DEPOSIT: {
    GENERAL_TAX_RATE: 0.14,
    ADDITIONAL_TAX_RATE: 0.014,
    PRIVILEGED_TAX_RATE: 0.09,
    PRIVILEGED_ADDITIONAL_TAX_RATE: 0.005,
  },
  MONTHLY_SAVINGS: {
    TAX_RATE: 0.154,
    PRIVILEGED_TAX_RATE: 0.095,
  },
}

/**
 * 세금 계산 유틸리티
 * @param {number} beforeTax - 세전 이자 금액
 * @param {'general'|'privileged'} type - 세금 유형
 * @returns {number} 세후 이자 금액
 */
function calculateTaxedInterest(
  beforeTax: number,
  type: "general" | "privileged" = "general"
): number {
  const constants = TAX_CONSTANTS.SIMPLE_DEPOSIT

  if (type === "general") {
    const generalTax = cutWon(
      cutWon(beforeTax * constants.GENERAL_TAX_RATE) +
        cutWon(beforeTax * constants.ADDITIONAL_TAX_RATE)
    )
    return beforeTax - generalTax
  } else {
    const privilegedTax = cutWon(
      cutWon(beforeTax * constants.PRIVILEGED_TAX_RATE) +
        cutWon(beforeTax * constants.PRIVILEGED_ADDITIONAL_TAX_RATE)
    )
    return beforeTax - privilegedTax
  }
}

/**
 * 단리 예금 계산
 * @param {number} period - 예금 기간 (개월)
 * @param {number} money - 예치금
 * @param {number} rate - 연간 이자율
 * @param {'0'|'1'} depositType - 예금 방식 (0: 복리, 1: 단리)
 * @returns {Array<Object>} 예금 계산 결과
 */
export function calculateDeposit(
  period: number,
  money: number,
  rate: number,
  depositType: string
) {
  let beforeTax = 0
  const result = []

  period = parseInt(String(period))
  money = parseInt(String(money))

  // 단리 계산
  if (depositType === "1") {
    beforeTax = parseInt(String(((money * (rate / 100)) / 12) * period))

    // 일반 과세
    const generalAfterTax = calculateTaxedInterest(beforeTax, "general")
    result.push({
      title: "일반",
      b_interest: Math.floor(beforeTax),
      a_interest: Math.floor(generalAfterTax),
      total_money: Math.floor(money + generalAfterTax),
      sum_mon: Math.floor(money + generalAfterTax - generalAfterTax),
    })

    // 비과세
    result.push({
      title: "비과세",
      b_interest: Math.floor(beforeTax),
      a_interest: Math.floor(beforeTax),
      total_money: Math.floor(money + beforeTax),
      sum_mon: Math.floor(money + beforeTax - beforeTax),
    })
  }
  // 복리 계산
  else {
    beforeTax =
      parseInt(String(money * Math.pow(1 + rate / 100 / 12, period))) - money

    // 일반 과세
    const generalAfterTax = calculateTaxedInterest(beforeTax, "general")
    result.push({
      title: "일반",
      b_interest: Math.floor(beforeTax),
      a_interest: Math.floor(generalAfterTax),
      total_money: Math.floor(money + generalAfterTax),
      sum_mon: Math.floor(money + generalAfterTax - generalAfterTax),
    })

    // 비과세
    result.push({
      title: "비과세",
      b_interest: Math.floor(beforeTax),
      a_interest: Math.floor(beforeTax),
      total_money: Math.floor(money + beforeTax),
      sum_mon: Math.floor(money + beforeTax - beforeTax),
    })
  }

  return result
}

/**
 * 월납입식 적금 계산
 * @param {number} period - 적금 기간
 * @param {number} money - 월 납입금
 * @param {number} rate - 연간 이자율
 * @returns {Array<Object>} 적금 계산 결과
 */
export function calculateMonthlyInstallment(
  period: number,
  money: number,
  rate: number
) {
  let beforeTax = 0
  let tmp = 0

  period = parseInt(String(period))
  money = parseInt(String(money))

  for (let i = 1; i <= period; i++) {
    tmp = money * (period - i + 1) * (rate / 100 / 12)
    beforeTax += tmp
  }

  beforeTax = parseInt(String(beforeTax))

  // 일반 과세
  const generalAfterTax =
    beforeTax - cutWon(beforeTax * TAX_CONSTANTS.MONTHLY_SAVINGS.TAX_RATE)

  // 일반
  const result = [
    {
      title: "일반",
      b_interest: Math.floor(beforeTax),
      a_interest: Math.floor(generalAfterTax),
      total_money: Math.floor(money * period + generalAfterTax),
      sum_mon: Math.floor(money * period + generalAfterTax - generalAfterTax),
    },
    // 비과세
    {
      title: "비과세",
      b_interest: Math.floor(beforeTax),
      a_interest: Math.floor(beforeTax),
      total_money: Math.floor(money * period + beforeTax),
      sum_mon: Math.floor(money * period + beforeTax - beforeTax),
    },
  ]

  return result
}

/**
 * 소수점 아래 4번째 자리 절삭
 * @param {number} money - 절삭할 금액
 * @returns {number} 절삭된 금액
 */
export function cutWon(money: number): number {
  money = Number(money + 0.001)
  const chgstr = String(money)
  const retstr = chgstr.substring(0, chgstr.length - 1) + "0"
  return Number(retstr)
}

/**
 * 숫자에 천 단위 쉼표 추가
 * @param {string} money - 쉼표 추가할 금액 문자열
 * @returns {string} 쉼표가 추가된 금액 문자열
 */
export function addComma(money: string): string {
  const moneyN = Number(removeComma(money))
  if (moneyN === 0 || isNaN(moneyN)) return "0"

  return moneyN.toLocaleString("ko-KR")
}

/**
 * 쉼표 제거
 * @param {string} money - 쉼표 제거할 금액 문자열
 * @returns {string} 쉼표가 제거된 금액 문자열
 */
export function removeComma(money: string): string {
  return money.replace(/,/g, "")
}
