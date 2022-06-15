import { Card, CardBody, CardText, Button } from 'reactstrap'
import medal from '@src/assets/images/illustration/badge.svg'
import { Link } from 'react-router-dom'

const MedalCard = (props) => {
    const { userData } = props
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Congratulations 🎉 {userData?.data?.firstName}!</h5>
        <CardText className='font-small-3'>You have won gold medal</CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            230k
          </a>
        </h3>
        <Button tag={Link} to="/projects" color='primary'>View Transactions</Button>
        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default MedalCard
