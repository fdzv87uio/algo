import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Link from 'next/link'
import * as S from './WhiteHeader.styles'

function WhiteHeader({ url }: { url: string }): JSX.Element {
  return (
    <S.HeaderWrapper>
      <Link href={url}>
        <a>
          <ArrowBackIcon style={{ color: '#1958BC', fontSize: 'inherit' }} />
        </a>
      </Link>
    </S.HeaderWrapper>
  )
}

export default WhiteHeader
