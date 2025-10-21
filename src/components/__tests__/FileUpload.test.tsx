import 'jest-environment-jsdom'
import { render, screen } from '@testing-library/react'
import FileUpload from '../FileUpload'

describe('FileUpload', () => {
  it('shows the correct file types for 3D Printing', () => {
    render(<FileUpload selectedService="3D Printing" isLoggedIn={true} />)
    expect(screen.getByText(/Supports .step, .stp, .stl, .3mf, .ai, .pdf, .zip/i)).toBeInTheDocument()
  })

  it('shows the correct file types for CNC Machining', () => {
    render(<FileUpload selectedService="CNC Machining" isLoggedIn={true} />)
    expect(screen.getByText(/Supports .step, .stp, .sldprt, .x_t, .ai, .pdf, .zip/i)).toBeInTheDocument()
  })

  it('shows the correct file types for Sheet Metal Fabrication', () => {
    render(<FileUpload selectedService="Sheet Metal Fabrication" isLoggedIn={true} />)
    expect(screen.getByText(/Supports .step, .stp, .dxf, .dwg, .ai, .pdf, .zip/i)).toBeInTheDocument()
  })

  it('updates the file types when the selected service changes', () => {
    const { rerender } = render(<FileUpload selectedService="3D Printing" isLoggedIn={true} />)
    expect(screen.getByText(/Supports .step, .stp, .stl, .3mf, .ai, .pdf, .zip/i)).toBeInTheDocument()

    rerender(<FileUpload selectedService="CNC Machining" isLoggedIn={true} />)
    expect(screen.getByText(/Supports .step, .stp, .sldprt, .x_t, .ai, .pdf, .zip/i)).toBeInTheDocument()
  })
})
