# AWS EC2 Microservice

A microservice for AWS elastic compute cloud.

## Usage

The service requires the following GET query strings:

- `action` - The required action
- `reference` - The instance id

Request:

```http
GET /ec2?action=start&reference=i-02fb9d486c6d282df HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

```http
GET /ec2?action=stop&reference=i-02fb9d486c6d282df HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

```http
GET /ec2?action=status&reference=i-02fb9d486c6d282df HTTP/1.1
Content-Type: application/x-www-form-urlencoded
```

Response:
```http
HTTP/1.1 200 OK

{
  "id": "i-02fb9d486c6d282df",
  "CurrentState": "stopping",
  "PreviousState": "running",
}

{
  "CurrentState": "stopped",
}
```
