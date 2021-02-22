import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './lot.reducer';
import { ILot } from 'app/shared/model/lot.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILotProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Lot = (props: ILotProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { lotList, match, loading } = props;
  return (
    <div>
      <h2 id="lot-heading">
        Lots
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Lot
        </Link>
      </h2>
      <div className="table-responsive">
        {lotList && lotList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Zipcode</th>
                <th>Maxslots</th>
                <th>Availableslots</th>
                <th>Isopen</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lotList.map((lot, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${lot.id}`} color="link" size="sm">
                      {lot.id}
                    </Button>
                  </td>
                  <td>{lot.name}</td>
                  <td>{lot.address}</td>
                  <td>{lot.zipcode}</td>
                  <td>{lot.maxslots}</td>
                  <td>{lot.availableslots}</td>
                  <td>{lot.isopen ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${lot.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lot.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${lot.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Lots found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ lot }: IRootState) => ({
  lotList: lot.entities,
  loading: lot.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Lot);
