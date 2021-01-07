import React from 'react'
import { Link } from 'gatsby'

const IndexPage = ({ data }) => (
  <div>
    <Link to="/en">English</Link>
    <Link to="/sv-SE">Svenska</Link>
  </div>
)

export default IndexPage
