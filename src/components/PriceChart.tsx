import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import moment from 'moment'

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 600, pv: 2400, amt: 2400}];

type PriceData = {
  price: number
  date: string
}

interface PriceChartProps {
  data: PriceData[]
  dataKey: string
}

const PriceChart: React.FC<PriceChartProps> = props => {
  const formatData = () => {
    if (props.data) {
      return props.data.map(priceData => ({price: priceData.price, date: moment(priceData.date).format('MMM DD, yyyy')}))
    }

    return []
  }

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart width={400} height={400} data={formatData()}>
        <XAxis dataKey="date" />
        <YAxis dataKey="price" />
        <Line type="monotone" dataKey={props.dataKey} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceChart