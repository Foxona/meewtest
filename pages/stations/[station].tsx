import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout";
import ClipboardToast from "../../components/ClipboardToast";
import Link from "next/link";
import { useRouter } from "next/router";
import * as api from "../../utils/swr";
import { toDate } from "../../utils/date";

const StationForm = () => {
  const router = useRouter();
  const id = parseInt("" + router.query.station);
  const { data: station, mutate } = api.useFetcher(
    api.GetStation,
    !!id && { id }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<api.CreateStationType>({});

  const onSubmitEdit: SubmitHandler<api.CreateStationType> = (data) => {
    console.log(data);
    api
      .UpdateStation({ id, ...data })
      .then((res) => {
        mutate();
        console.log(res);
        router.push("/stations");
      })
      .catch((err) => console.log(err));
  };

  const [xy, setxy] = useState({ x: 0, y: 0 });
  const [showClipboard, setShowClipboard] = useState("");

  if (!station) {
    return <></>;
  }

  const { created_at, updated_at, name, comment, api_key } = station;

  return (
    <>
      {showClipboard && (
        <ClipboardToast
          x={xy.x}
          y={xy.y}
          message={showClipboard}
          setMessage={setShowClipboard}
        />
      )}
      <Link href={"/stations"} passHref>
        <Button variant="outline-secondary" size="sm">
          <i className="bi bi-arrow-left"></i>
        </Button>
      </Link>
      <Form className="mt-2" onSubmit={handleSubmit(onSubmitEdit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Station Name</Form.Label>
          <Form.Control
            defaultValue={name}
            type="text"
            placeholder="Enter station name"
            {...register("name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Station Comment</Form.Label>
          <Form.Control
            defaultValue={comment}
            as="textarea"
            rows={3}
            {...register("comment")}
          />
        </Form.Group>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> API Key </span>
              <span
              className="link-primary form-control overflow-hidden"
              style={{whiteSpace:"nowrap"}}
              onClick={(e) => {
                setxy({ x: e.clientX, y: e.clientY });
                setShowClipboard(station.api_key);
              }}
            >
              {api_key}
            </span>
        </div>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> Station ID </span>
          <input disabled type="text" className="form-control" value={station.id} />
        </div>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> Created </span>
          <input disabled type="text" className="form-control" value={toDate(station.created_at)} />
        </div>
        <p> </p>
        <div className="input-group mb-3">
          <span className="input-group-text col-5 col-lg-3"> Updated at </span>
          <input disabled type="text" className="form-control" value={station.updated_at && toDate(station.updated_at)} />
        </div>
        <Button className="mt-3" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

const StationPage: NextPage = () => {
  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} lg={6}>
          <StationForm />
        </Col>
      </Row>
    </Layout>
  );
};

export default StationPage;
