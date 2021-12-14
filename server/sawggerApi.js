/**
 * @swagger
 * components:
 *  schemas:
 *   Client:
 *    type: object
 *    required:
 *      - name
 *      - email
 *    properties:
 *      id:
 *        type: string
 *        description: The auto-generated id of the client
 *      name:
 *        type: string
 *        description: The client name
 *      email:
 *        type: string
 *        description: The client email
 *      phone:
 *        type: number
 *        description: The client phone
 *    example:
 *      id: 61b460aafcbc65f03250e81c
 *      name: saeed digeel
 *      email: saeed@digeel.com
 *      phone: 2494545343
 *   Provider:
 *    type: object
 *    required:
 *      - name
 *    properties:
 *      id:
 *        type: string
 *        description: The auto-generated id of the provider
 *      name:
 *        type: string
 *        description: The provider name
 *    example:
 *      name: provider 1
 */

/**
 * @swagger
 * tags:
 *   - name: Clients
 *     description: The clients managing API
 *   - name: Provider
 *     description: The providers managing API
 */

/**
 * @swagger
 * /api/v1/providers:
 *   get:
 *     summary: Returns the list of all the providers
 *     tags: [Providers]
 *     responses:
 *       200:
 *         description: The list of the providers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Provider'
 *
 *   post:
 *     summary: Create a new provider
 *     tags: [Providers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       200:
 *         description: The provider was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/v1/providers/{id}:
 *   get:
 *     summary: Get the provider by id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     responses:
 *       200:
 *         description: The provider description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *         description: The provider was not found
 *   patch:
 *     summary: Update the provider by the id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Provider'
 *     responses:
 *       200:
 *         description: The provider was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Provider'
 *       404:
 *        description: The provider was not found
 *       500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the provider by id
 *     tags: [Providers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The provider id
 *
 *     responses:
 *       200:
 *         description: The provider was deleted
 *       404:
 *         description: The provider was not found
 */

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Returns the list of all the clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: The list of the clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *     responses:
 *       200:
 *         description: The client description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: The client was not found
 *   patch:
 *     summary: Update the client by the id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Client'
 *     responses:
 *       200:
 *         description: The client was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: The client was not found
 *       500:
 *         description: Some error happened
 *   delete:
 *     summary: Remove the client by id
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The client id
 *
 *     responses:
 *       200:
 *         description: The client was deleted
 *       404:
 *         description: The client was not found
 */
