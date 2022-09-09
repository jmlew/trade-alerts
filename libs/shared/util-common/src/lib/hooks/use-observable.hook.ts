import { useEffect, useState } from 'react';
import { Observable, Subscription } from 'rxjs';

export function useObservable<T>(observable: Observable<T>) {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const subscription: Subscription = observable.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable]);

  return value;
}
