import { MeshProps, BufferGeometryProps, PrimitiveProps } from '@react-three/fiber'

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: MeshProps
    planeGeometry: BufferGeometryProps
    primitive: PrimitiveProps
  }
} 