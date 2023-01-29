import React from 'react'
import StatsWidgets from '../../components/StatsWidgets'
import { useFetchData } from '../../hooks'
import ApiList from '../../api/ApiList'
import { Loader } from '../../components'

type Props = {}

const Stats = (props: Props) => {

    const { data, isSuccess } = useFetchData(ApiList.getStats);

    if (!isSuccess)
        return <Loader />
    return (
        <div style={{ width: '100%', height: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
            <StatsWidgets data={data} />
        </div>
    )
}

export default Stats