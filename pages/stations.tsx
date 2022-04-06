import { NextPage } from "next";
import React, { SetStateAction, useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  createConfiguration,
  ServerConfiguration,
  StationsApi,
  Station,
  CreateStation,
} from "../api";
import { Badge, ListGroup, Button, Modal, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";
import Link from "next/link";

// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

const cfg = createConfiguration({
  baseServer: new ServerConfiguration("https://ryikku.meew.me", {}),
});
const stationsApi = new StationsApi(cfg);

const StationModal = (props: {
  showModal: boolean;
  setShowModal: (_: boolean) => void;
}) => {
  const { showModal, setShowModal } = props;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateStation>();

  const onSubmit: SubmitHandler<CreateStation> = (data) => {
    stationsApi
      .createStationStationsPost(
        {
          name: data.name,
          comment: data.comment,
        },
        token
      )
      .then((res) => {
        console.log(res);
        window.location.href = "/stations";
      })
      .catch((err) => console.log(err.response));
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Station</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Station Name</Form.Label>
              <Form.Control
                placeholder="Epsilon 13"
                autoFocus
                {...register("name", { required: true })}
              />
            </Form.Group>
            <p>
              {errors.name && (
                <span className="text-danger">Station name is required</span>
              )}
            </p>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("comment")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Station
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const StationList = (props: { stations: Station[] }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { stations } = props;

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    stationsApi.deleteStationStationsIdDelete(id, token).then((res) => {
      console.log(res);
      window.location.href = "/stations";
    });
  };

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <h2>Stations</h2>
        <Button className="ms-auto" onClick={() => setShowModal(true)}>
          Create Station
        </Button>
      </div>
      <StationModal showModal={showModal} setShowModal={setShowModal} />
      <ListGroup as="ol" numbered>
        {stations.map((station) => (
          // <div key={station.id} >
          <Link
            key={station.id}
            href={`/stations/[...station]`}
            as={`/stations/station/${station.id}`}
            passHref
          >
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div>
                  Station: <span className="fw-bold">{station.name}</span>
                </div>
                <div className="mt-1">
                  Id: <span className="fw-bold">{station.id}</span>
                </div>
                <div className="mt-1">
                  Comment: <span className="fw-bold">{station.comment}</span>
                </div>
                <div className="mt-1">
                  ApiKey:{" "}
                  <span className="fw-bold">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="text-primary"
                    >
                      {station.api_key}
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  Created at:{" "}
                  <span className="fw-bold">
                    {station.created_at.toUTCString()}
                  </span>
                </div>
                {station.updated_at && (
                  <div className="mt-1">
                    Updated at:{" "}
                    <span className="fw-bold">
                      {station.updated_at.toUTCString()}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-danger"
                    onClick={(e) => handleRemove(e, station.id)}
                  >
                    Remove <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </>
  );
};

const Stations: NextPage = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    stationsApi.listStationsStationsGet(token as string).then((res) => {
      setStations(res);
    });
  }, []);

  return (
    <Layout>
      <StationList stations={stations} />
    </Layout>
  );
};

export default Stations;
