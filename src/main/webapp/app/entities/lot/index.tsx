import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Lot from './lot';
import LotDetail from './lot-detail';
import LotUpdate from './lot-update';
import LotDeleteDialog from './lot-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LotUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LotDetail} />
      <ErrorBoundaryRoute path={match.url} component={Lot} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LotDeleteDialog} />
  </>
);

export default Routes;
