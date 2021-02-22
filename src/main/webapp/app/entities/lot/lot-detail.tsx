import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './lot.reducer';
import { ILot } from 'app/shared/model/lot.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILotDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LotDetail = (props: ILotDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { lotEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Lot [<b>{lotEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{lotEntity.name}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{lotEntity.address}</dd>
          <dt>
            <span id="zipcode">Zipcode</span>
          </dt>
          <dd>{lotEntity.zipcode}</dd>
          <dt>
            <span id="maxslots">Maxslots</span>
          </dt>
          <dd>{lotEntity.maxslots}</dd>
          <dt>
            <span id="availableslots">Availableslots</span>
          </dt>
          <dd>{lotEntity.availableslots}</dd>
          <dt>
            <span id="isopen">Isopen</span>
          </dt>
          <dd>{lotEntity.isopen ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/lot" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/lot/${lotEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ lot }: IRootState) => ({
  lotEntity: lot.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LotDetail);
