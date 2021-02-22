import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './lot.reducer';
import { ILot } from 'app/shared/model/lot.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILotUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LotUpdate = (props: ILotUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { lotEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/lot');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...lotEntity,
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
          <h2 id="parkingSystemApplicationApp.lot.home.createOrEditLabel">Create or edit a Lot</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : lotEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="lot-id">ID</Label>
                  <AvInput id="lot-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="lot-name">
                  Name
                </Label>
                <AvField
                  id="lot-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="lot-address">
                  Address
                </Label>
                <AvField
                  id="lot-address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipcodeLabel" for="lot-zipcode">
                  Zipcode
                </Label>
                <AvField
                  id="lot-zipcode"
                  type="text"
                  name="zipcode"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    minLength: { value: 6, errorMessage: 'This field is required to be at least 6 characters.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="maxslotsLabel" for="lot-maxslots">
                  Maxslots
                </Label>
                <AvField
                  id="lot-maxslots"
                  type="string"
                  className="form-control"
                  name="maxslots"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' },
                    number: { value: true, errorMessage: 'This field should be a number.' },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="availableslotsLabel" for="lot-availableslots">
                  Availableslots
                </Label>
                <AvField id="lot-availableslots" type="string" className="form-control" name="availableslots" />
              </AvGroup>
              <AvGroup check>
                <Label id="isopenLabel">
                  <AvInput id="lot-isopen" type="checkbox" className="form-check-input" name="isopen" />
                  Isopen
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/lot" replace color="info">
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
  lotEntity: storeState.lot.entity,
  loading: storeState.lot.loading,
  updating: storeState.lot.updating,
  updateSuccess: storeState.lot.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LotUpdate);
