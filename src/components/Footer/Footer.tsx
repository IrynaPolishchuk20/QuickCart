import { FaFacebook, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer-text'>© 2025 Quick Card</p>
      <div className='social-icons'>
        <a
          className='icon facebook'
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>
        <a
          className='icon telegram'
          href="https://t.me/yourchannel"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <FaTelegramPlane />
        </a>
        <a
          className='icon instagram'
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
}
