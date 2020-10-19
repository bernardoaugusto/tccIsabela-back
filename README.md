

## 🏁 Getting Started <a name = "getting_started"></a>

To run in your machine, follow the steps below.

```
git clone https://github.com/bernardoaugusto/tccIsabela-back

cd tccIsabela-back

yarn

docker run --name mongodb -p 27017:27017 -d -t mongo

docker run --name redis -p 6379:6379 -d -t redis:alpine

docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

yarn typeorm migration:run


```

## 🔧 Running the tests <a name = "tests"></a>

To tests in your machine, run the command below.

```
yarn test
```
