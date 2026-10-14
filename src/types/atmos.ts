export interface ResCreateCreditCardProps {
  detail: string
  status: 'OK' | 'STPIMS-ERR-133' | 'ALREADY_CONFIRMED_CARD'
  transaction_id: number | null
}

export interface ResPlumCreateCreditCardProps {
  detail: string
  status: number
  transaction_id: number | null
}

export interface PlumErrorProps {
  error: {
    errorCode: string
    errorMessage: string
  }
  result: string
}

export interface CardsProps {
  id: string
  card_number: string
}
