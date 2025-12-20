So i want to write down what is the API going to be able to do

Start with a monolithic (single codebase) service, but structured cleanly with layers (routing → service → data access → domain). That gives simplicity + maintainability.

Expose a well-designed REST API using resource-oriented URIs, proper HTTP methods, good consistency, versioning, clear JSON schema. Treat the API contract seriously.

Add infrastructure for stability and governance early: error handling, logging, authentication/authorization, rate limits, monitoring/metrics, documentation.

so I am going to search and study about all of that jazz