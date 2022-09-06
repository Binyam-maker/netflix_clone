export default async function (req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests are allowed." });
    return;
  }

  res.status(201).json({ user: req.body });
}
