`ts-refada-example-mealie`

# MEALIE seeding via REFADA

Implementation of [@mantlebee/ts-refada](https://github.com/mantlebee/ts-refada) for [mealie-recipes/mealie](https://github.com/mealie-recipes/mealie) to seed MEALIE tables.

Purpose of this project is to show how to use the REFADA project to seed tables of your project.

## Requirements

In order to run this project, [Docker Compose](https://docs.docker.com/compose/) and [Node JS](https://nodejs.org/) are required.

## Get Started

First of all, we need a MEALIE project up and running.

1. Clone this repository
2. Run MEALIE using Docker Compose: `docker-compose.exe -f docker.compose.yml up -d`
3. Navigate to [http://localhost:9925](http://localhost:9925) and follow the MEALIE configuration wizard. Pay attention to
   - remember the **username** choosen. It will necessary to configure the REFADA integration.
   - keep flagged the options **Use Seed Data**.

At the moment we only started a new MEALIE project. As you can see, no data is present. Let's generate some data!

Now we install REFADA dependencies and run the seed command.

4. Install Node dependencies using the command `npm i`
5. Configure REFADA editing the file `./src/config.js`:
   - Change the **username** using the one choosen at point 3
   - Defining the amount of rows you want to generate in the `DatabaseSeedingCounts` map.
6. Run seeding using the command `node src/seed.js`.
   - The seeding process always clears data before seeding.
   - In case of errors seeded tables are cleared also.
   - The user choosen at point 3 is always preserved (it never get deleted).
   - During this operation a _SQLITE_CONSTRAINT_ error could occur. If so have a look to the [Known Errors](#known-errors) chapter.
7. Reload the page [http://localhost:9925](http://localhost:9925) to see generated data.

What now? Let's have a look on [how we achieved that](#refada-for-mealie).

## REFADA for MEALIE

To seed the MEALIE tables, REFADA uses its concepts of Tables and Database.

Inside the folder `src/refada` there are:

- the `tables` folder where MEALIE tables are remapped with REFADA tables.
- the `database.js` file where all tables are registered for data seeding.

Check the `tables` folder and the `database.js` file for more explanations.

## Known Errors

During the seed operation the following error could occur.

```
[Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: ...] {
  errno: 19,
  code: 'SQLITE_CONSTRAINT'
}
```

MEALIE defined some contraints on columns _group_id_ and _slug_ that are not managed by this example. Just rerun the seed command.
