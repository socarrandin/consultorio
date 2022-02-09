import { createUser, deleteUser, getAllUser, getUser, updateUser } from "prisma/user"

export default async function handle(req, res) {

    const { method, query } = req
    switch (method) {
        case 'GET':
            try {
                if (query.id) {
                    const user = await getUser(query.id)
                    return res.status(200).json({ success: true, user });
                } else {
                    const users = await getAllUser()
                    return res.status(200).json({ success: true, users });
                }

            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, ...error, message: error.message });
            }
        case 'POST':
            try {
                const { email, name, birthyear } = req.body
                const user = await createUser(email, name, birthyear)
                return res.status(200).json({ success: true, user })

            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, ...error, message: error.message });
            }
        case 'PUT':
            try {
                const { id, ...updateData } = req.body
                const user = await updateUser(id, updateData)
                return res.status(200).json({ success: true, user })
            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, ...error, message: error.message });
            }
        case 'DELETE':
            try {
                const { id } = req.body
                const user = await deleteUser(id)
                return res.status(200).json({ success: true, user })

            } catch (error) {
                return res
                    .status(400)
                    .json({ success: false, ...error, message: error.message });
            }

        default:
            return res
                .status(500)
                .json({ success: false, ...error, message: error.message });
    }

}
