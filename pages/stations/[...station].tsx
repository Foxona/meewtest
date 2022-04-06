import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import {
  AuthApi,
  createConfiguration,
  ServerConfiguration,
  StationsApi,
  Station,
  UpdateStation,
} from "../../api";
import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

const cfg = createConfiguration({
  baseServer: new ServerConfiguration("https://ryikku.meew.me", {}),
});
const stationsApi = new StationsApi(cfg);

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

const StationForm = () => {
  const router = useRouter();

  const [stationEntity, setStationEntity] = useState<Station>();

  useEffect(() => {
    // const id = parseInt(router?.query?.station[1]);

    stationsApi.getStationByIdStationsIdGet(33, token).then((res) => {
      setStationEntity(res);
    });
  }, [router.query]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateStation>();

  const onSubmitEdit: SubmitHandler<UpdateStation> = (data) => {
    console.log(data);
    stationsApi
      .updateStationStationsIdPatch(
        42,
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
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Link href={"/stations"} passHref>
        <Button variant="outline-secondary" size="sm">
          Back
        </Button>
      </Link>
      <Form className="mt-2" onSubmit={handleSubmit(onSubmitEdit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Station Name</Form.Label>
          <Form.Control
            defaultValue={stationEntity?.name}
            type="text"
            placeholder="Enter station name"
            {...register("name", { required: true })}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label>Station Comment</Form.Label>
          <Form.Control
            defaultValue={stationEntity?.comment}
            as="textarea"
            rows={3}
            {...register("comment")}
          />
        </Form.Group>
        <div className="d-flex flex-column mt-2">
          <span>Station Id: {stationEntity?.id}</span>
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
                {stationEntity?.api_key}
              </a>
            </span>
          </span>
          <span>Created At: {stationEntity?.created_at.toUTCString()}</span>
          {stationEntity?.updated_at && (
            <span>Updated At: {stationEntity?.updated_at?.toUTCString()}</span>
          )}
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
        <Col xs={12} md={4}>
          <StationForm />
        </Col>
      </Row>
    </Layout>
  );
};

export default StationPage;

// {
/* <Button
variant="outline-secondary"
onClick={() => handleUpdate(station.id)}
>
Update <i className="bi bi-trash3"></i>
</Button> */
// }

// const handleUpdate = (id: number) => {
//   stationsApi.deleteStationStationsIdDelete(id, token).then((res) => {
//     console.log(res);
//   });
// };
