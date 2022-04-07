import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Layout from "../../components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import * as api from "../../utils/swr";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

const StationForm = (props) => {
  const {
    station: { created_at, updated_at, id, name, comment, api_key },
  } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<>({});

  const onSubmitEdit: SubmitHandler<> = (data) => {
    console.log(data);

    // stationsApi
    //   .updateStationStationsIdPatch(
    //     42,
    //     {
    //       name: data.name,
    //       comment: data.comment,
    //     },
    //     token
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     window.location.href = "/stations";
    //   })
    //   .catch((err) => console.log(err));
  };

  return (
    <>
      <Link href={"/stations"} passHref>
        <Button variant="outline-secondary" size="sm">
          {"<-"}
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
        <div className="d-flex flex-column mt-2">
          <span>Station Id: {id}</span>
          <span>
            ApiKey:{" "}
            <span className="fw-bold">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="text-primary"
              >
                {api_key}
              </a>
            </span>
          </span>
          <span>Created At: {created_at}</span>
          {updated_at && <span>Updated At: {updated_at}</span>}
        </div>
        <Button className="mt-3" variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};

const StationPage: NextPage = () => {
  const router = useRouter();
  const id = parseInt(router.query.station);
  const { data: station } = api.useFetcher(api.GetStation, {
    id: id,
  });

  return (
    <Layout>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          {station && (
            <StationForm station={station} id={router.query.station} />
          )}
        </Col>
      </Row>
    </Layout>
  );
};

export default StationPage;
