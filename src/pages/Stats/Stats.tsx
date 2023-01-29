import React from 'react'
import StatsWidgets from '../../components/StatsWidgets'
import { useFetchData } from '../../hooks'
import ApiList from '../../api/ApiList'

type Props = {}

const Stats = (props: Props) => {

    const { data, isSuccess } = useFetchData(ApiList.getStats);

    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
            <StatsWidgets data={data} />
        </div>
    )
}

export default Stats