import React, { useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';

function App({ campaigns }) {
  const renderCampaign = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        style: { overflowWrap: 'break-word' },
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open campaigns</h3>

        <Link route='/campaigns/new'>
          <a>
            <Button
              style={{ marginLeft: '10px' }}
              floated='right'
              content='Create Campaign'
              icon='add circle'
              primary
            />
          </a>
        </Link>
        {renderCampaign()}
      </div>
    </Layout>
  );
}

App.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default App;
