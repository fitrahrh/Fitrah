const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Verifikasi kata sandi
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Jika kata sandi tidak sesuai
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, 'rahasia', { expiresIn: '1h' });

    // Kirim pesan validasi
    res.status(200).json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ message: 'Error dalam proses login', error });
  }
};

module.exports = { login };
