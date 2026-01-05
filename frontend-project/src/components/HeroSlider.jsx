import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function HeroSlider({ slides, interval = 5000 }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval]);

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__viewport">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero__slide${idx === current ? ' is-active' : ''}`}
            >
              <img src={slide.image} alt={slide.title} className="hero__image" />
              <div className="hero__overlay">
                <div className="hero__content">
                  <h2 className="hero__title">{slide.title}</h2>
                  <p className="hero__subtitle">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
          {/* <button
            type="button"
            className="hero__control hero__control--prev"
            onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
            aria-label="이전 슬라이드"
          >
            <ChevronLeft size={24} color="#ff3700ff" />
          </button>
          <button
            type="button"
            className="hero__control hero__control--next"
            onClick={() => setCurrent((current + 1) % slides.length)}
            aria-label="다음 슬라이드"
          >
            <ChevronRight size={24} color="#ff3700ff" />
          </button> */}
          <div className="hero__indicators">
            {slides.map((_, idx) => (
              <button
                type="button"
                key={idx}
                className={`hero__indicator${idx === current ? ' is-active' : ''}`}
                onClick={() => setCurrent(idx)}
                aria-label={`슬라이드 ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
