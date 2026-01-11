import { Component, Input } from '@angular/core';

interface SliderItem {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  description?: string;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent {
  @Input('images') sliderImages: any;
mainTitle = 'Isurumuniya Vihara';
mainDescription = 'A rock temple popular for its stone carvings of the "Isurumuniya Lovers", "Horseman", "Elephants Pond" and the "Royal Family".';
  
  backgroundImage = '';
  backgroundImage2 = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop';
  
   originalSliderItems: SliderItem[] = [
    {
      id: 1,
      title: 'Thuparama',
      subtitle: 'Dagoba',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      description: 'Ancient Buddhist stupa in Anuradhapura'
    },
    {
      id: 2,
      title: 'Kuttam',
      subtitle: 'Pokuna',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
      description: 'Twin ponds ancient bathing tanks'
    },
    {
      id: 3,
      title: 'Mirisavatiya',
      subtitle: 'Dagoba',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
      description: 'Historic Buddhist stupa complex'
    },
    {
      id: 4,
      title: 'Nuwarawewa',
      subtitle: 'Wewa',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&sat=-100',
      description: 'Ancient reservoir system'
    },
    {
      id: 5,
      title: 'Isurumuniya',
      subtitle: 'Vihara',
      image: 'assets/images/isurumuniya-main.jpg',
      description: 'Ancient rock temple complex'
    }
  ];

  // Dynamic slider items that will be reordered
  sliderItems: SliderItem[] = [];
  
  currentIndex = 0;
  private autoSlideInterval: any;
  private readonly slideInterval = 4000; // 4 seconds
  isAutoPlaying = true;
  private isTransitioning = false;

  ngOnInit(): void {
    // Initialize slider items with original order
    this.sliderItems = [...this.originalSliderItems];
    
    // Set initial background image
    this.updateBackgroundImage();
    
    // Start auto sliding
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.onNext();
    }, this.slideInterval);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  private updateBackgroundImage(): void {
    // Always use the first item as background (index 0)
    this.backgroundImage = this.sliderItems[0]?.image || '';
  }

  private moveFirstItemToLast(): void {
    if (this.sliderItems.length > 1) {
      // Remove the first item
      const firstItem = this.sliderItems.shift();
      if (firstItem) {
        // Add it to the end
        this.sliderItems.push(firstItem);
      }
      // Update background to new first item
      this.updateBackgroundImage();
    }
  }

  private moveLastItemToFirst(): void {
    if (this.sliderItems.length > 1) {
      // Remove the last item
      const lastItem = this.sliderItems.pop();
      if (lastItem) {
        // Add it to the beginning
        this.sliderItems.unshift(lastItem);
      }
      // Update background to new first item
      this.updateBackgroundImage();
    }
  }

  onSlideClick(item: SliderItem, index: number): void {
    if (this.isTransitioning) return;
    
    // Move clicked item to first position
    const clickedItem = this.sliderItems[index];
    this.sliderItems.splice(index, 1);
    this.sliderItems.unshift(clickedItem);
    
    this.currentIndex = 0;
    this.updateBackgroundImage();
    
    // Restart auto slide when user interacts
    this.stopAutoSlide();
    this.startAutoSlide();
    
    console.log('Clicked on:', item.title);
  }

  onPrevious(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Move last item to first position (reverse direction)
    this.moveLastItemToFirst();
    this.currentIndex = 0;
    
    // Restart auto slide when user interacts
    this.stopAutoSlide();
    setTimeout(() => {
      this.isTransitioning = false;
      this.startAutoSlide();
    }, 400);
  }

  onNext(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    
    // Animate to next position first
    this.currentIndex = 1;
    
    // After animation completes, rearrange items
    setTimeout(() => {
      this.moveFirstItemToLast();
      this.currentIndex = 0;
      this.isTransitioning = false;
    }, 400);
  }

  onIndicatorClick(index: number): void {
    if (this.isTransitioning) return;
    
    // Calculate how many positions to rotate
    const rotations = index;
    
    // Rotate items to bring selected item to front
    for (let i = 0; i < rotations; i++) {
      this.moveFirstItemToLast();
    }
    
    this.currentIndex = 0;
    
    // Restart auto slide when user interacts
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  toggleAutoPlay(): void {
    if (this.isAutoPlaying) {
      this.stopAutoSlide();
      this.isAutoPlaying = false;
    } else {
      this.startAutoSlide();
      this.isAutoPlaying = true;
    }
  }

  // Pause auto slide on mouse enter
  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  // Resume auto slide on mouse leave
  onMouseLeave(): void {
    if (this.isAutoPlaying) {
      this.startAutoSlide();
    }
  }

  // Get current slide for indicator highlighting
  getCurrentSlideIndex(): number {
    if (!this.sliderItems[0]) return 0;
    
    // Find the index of current first item in original array
    return this.originalSliderItems.findIndex(item => item.id === this.sliderItems[0].id);
  }
}
