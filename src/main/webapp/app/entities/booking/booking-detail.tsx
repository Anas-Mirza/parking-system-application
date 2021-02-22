import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBookingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingDetail = (props: IBookingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bookingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Booking [<b>{bookingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="vehicleno">Vehicleno</span>
          </dt>
          <dd>{bookingEntity.vehicleno}</dd>
          <dt>
            <span id="entrytime">Entrytime</span>
          </dt>
          <dd>{bookingEntity.entrytime ? <TextFormat value={bookingEntity.entrytime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="exittime">Exittime</span>
          </dt>
          <dd>{bookingEntity.exittime ? <TextFormat value={bookingEntity.exittime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>User</dt>
          <dd>{bookingEntity.user ? bookingEntity.user.login : ''}</dd>
          <dt>Lot</dt>
          <dd>{bookingEntity.lot ? bookingEntity.lot.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/booking" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/booking/${bookingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ booking }: IRootState) => ({
  bookingEntity: booking.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetail);
