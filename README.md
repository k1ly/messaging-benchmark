# Messaging Benchmark

This application is designed to populate a MongoDB database with mock data and measure the speed of message search by text.

## Installation

1. Install [Node.js](https://nodejs.org/)
2. Clone the repository:

    ```bash
    git clone https://github.com/k1ly/messaging-benchmark.git
    ```

3. Navigate to the application directory:

    ```bash
    cd messaging-benchmark
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

## Configuration

1. Create a `.env` file similar to the `.env.template`.
2. Specify the Connection String to your MongoDB server in the `.env` file. For example:

    ```
    MONGODB_CONNECTION_STRING=mongodb://localhost:27017
    ```

3. Set other environment variables in the `.env` file.

## Usage

1. **Run the application** to fill the database with mock data:

    ```bash
    npm run start
    ```

2. **Execute Jest test** to measure the speed of message search by text:

    ```bash
    npm run test
    ```

## Results

The benchmark involves conducting multiple iteration with the respective measurements that will be presented. Upon completing the benchmark, the console will display the average execution time across all iterations.
