import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ILot } from 'app/shared/model/lot.model';
import { getEntities as getLots } from 'app/entities/lot/lot.reducer';
import { getEntity, updateEntity, createEntity, reset } from './booking.reducer';
import { IBooking } from 'app/shared/model/booking.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BookingUpdate = (props: IBookingUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [lotId, setLotId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bookingEntity, users, lots, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/booking');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getLots();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.entrytime = convertDateTimeToServer(values.entrytime);
    values.exittime = convertDateTimeToServer(values.exittime);

    if (errors.length === 0) {
      const entity = {
        ...bookingEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="parkingSystemApplicationApp.booking.home.createOrEditLabel">Create or edit a Booking</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bookingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="booking-id">ID</Label>
                  <AvInput id="booking-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="vehiclenoLabel" for="booking-vehicleno">
                  Vehicleno
                </Label>
                <AvField
                  id="booking-vehicleno"
                  type="text"
                  name="vehicleno"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="entrytimeLabel" for="booking-entrytime">
                  Entrytime
                </Label>
                <AvInput
                  id="booking-entrytime"
                  type="datetime-local"
                  className="form-control"
                  name="entrytime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bookingEntity.entrytime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="exittimeLabel" for="booking-exittime">
                  Exittime
                </Label>
                <AvInput
                  id="booking-exittime"
                  type="datetime-local"
                  className="form-control"
                  name="exittime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.bookingEntity.exittime)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="booking-user">User</Label>
                <AvInput id="booking-user" type="select" className="form-control" name="user.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="booking-lot">Lot</Label>
                <AvInput
                  id="booking-lot"
                  type="select"
                  className="form-control"
                  name="lot.id"
                  value={isNew ? lots[0] && lots[0].id : bookingEntity.lot?.id}
                  required
                >
                  {lots
                    ? lots.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>This field is required.</AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/booking" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  lots: storeState.lot.entities,
  bookingEntity: storeState.booking.entity,
  loading: storeState.booking.loading,
  updating: storeState.booking.updating,
  updateSuccess: storeState.booking.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getLots,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BookingUpdate);
